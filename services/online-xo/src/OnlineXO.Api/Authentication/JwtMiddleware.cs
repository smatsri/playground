using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace OnlineXO.Api.Authentication
{
	public static class PlaygroundAuthenticationDefaults
	{
		public const string AuthenticationScheme = "Playground";
	}

	public class PlaygroundAuthenticationOptions : AuthenticationSchemeOptions { }

	public class PlaygroundAuthenticationHandler : AuthenticationHandler<PlaygroundAuthenticationOptions>
	{
		private readonly IConfiguration configuration;

		public PlaygroundAuthenticationHandler(
			IOptionsMonitor<PlaygroundAuthenticationOptions> options,
			ILoggerFactory logger,
			UrlEncoder encoder,
			ISystemClock clock,
			IConfiguration configuration) : base(options, logger, encoder, clock)
		{
			this.configuration = configuration;
		}

		protected override Task<AuthenticateResult> HandleAuthenticateAsync()
		{
			var res = HandleAuthenticate();
			return Task.FromResult(res);
		}

		AuthenticateResult HandleAuthenticate()
		{
			var secret = configuration["auth:jwtSecret"];
			var key = Encoding.ASCII.GetBytes(secret);

			var header = Request.Headers["authorization"];
			
			var token = header.Select(a=> a.Split(' ').Skip(1).FirstOrDefault()).FirstOrDefault();

			if (string.IsNullOrEmpty(token))
				return AuthenticateResult.Fail("could not find auth cookie");

			var tokenHandler = new JwtSecurityTokenHandler();

			tokenHandler.ValidateToken(token, new TokenValidationParameters
			{
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(key),
				ValidateIssuer = false,
				ValidateAudience = false,
				ClockSkew = TimeSpan.Zero
			}, out SecurityToken validatedToken);

			var jwtToken = (JwtSecurityToken)validatedToken;
			var identity = new ClaimsIdentity(jwtToken.Claims, Scheme.Name);
			var principal = new ClaimsPrincipal(identity);
			var ticket = new AuthenticationTicket(principal, Scheme.Name);
			return AuthenticateResult.Success(ticket);
		}
	}

	public static class StartupExtensions
	{
		public static void AddPlayground(this AuthenticationBuilder builder)
		{
			builder.AddScheme<PlaygroundAuthenticationOptions, PlaygroundAuthenticationHandler>(
				PlaygroundAuthenticationDefaults.AuthenticationScheme, c => { }
			);
		}
	}
}
