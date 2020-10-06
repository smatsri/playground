using System.Collections.Generic;
using System.Security.Claims;

namespace IdentityService
{
  public interface IJwtAuthenticationManager
  {
    string CreateToken(IEnumerable<Claim> claims);
  }
}
