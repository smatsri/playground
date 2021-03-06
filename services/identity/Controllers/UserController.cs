﻿using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Controller
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  //[EnableCors]
  public class UserController : ControllerBase
  {
    private static readonly IDictionary<string, string> creds = new Dictionary<string, string>
    {
      { "shai", "123456" }
    };

    private readonly IJwtAuthenticationManager jwtAuthenticationManager;

    public UserController(IJwtAuthenticationManager jwtAuthenticationManager)
    {
      this.jwtAuthenticationManager = jwtAuthenticationManager;
    }

    [Route("")]
    [HttpGet]
    [AllowAnonymous]
    public IActionResult Get()
    {
      return Ok("ok2");
    }


    [Route("login")]
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginRequest req)
    {
      var credValid = creds.ContainsKey(req.Username) && creds[req.Username] == req.Password;
      if (!credValid)
      {
        return Unauthorized();
      }

      var claims = new List<Claim>
      {
          new Claim(ClaimTypes.Name, req.Username),
          new Claim(ClaimTypes.NameIdentifier, req.Username)
      };

      var claimsIdentity = new ClaimsIdentity(
        claims, CookieAuthenticationDefaults.AuthenticationScheme);

      var signinProps = new AuthenticationProperties();
      if (req.RememberMe)
      {
        signinProps.ExpiresUtc = DateTime.UtcNow.AddYears(1);
        signinProps.IsPersistent = true;
      }

      await HttpContext.SignInAsync(
          CookieAuthenticationDefaults.AuthenticationScheme,
          new ClaimsPrincipal(claimsIdentity),
          signinProps);

      return Ok(new { success = true });
    }

    [Route("profile")]
    [HttpGet]
    public IActionResult Profile()
    {
      return Ok(new { name = User.Identity.Name });
    }

    [Route("token")]
    [HttpGet]
    public IActionResult Token()
    {
      var token = jwtAuthenticationManager.CreateToken(User.Claims);
      return Ok(new { token });
    }

    [Route("logout")]
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Logout()
    {
      await HttpContext.SignOutAsync();
      return Ok();
    }
  }

  public class LoginRequest
  {
    public string Username { get; set; }
    public string Password { get; set; }
    public bool RememberMe { get; set; }
  }
}