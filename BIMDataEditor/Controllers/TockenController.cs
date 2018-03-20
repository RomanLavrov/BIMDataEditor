using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Autodesk.Forge;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace BIMDataEditor.Controllers
{
    public class TockenController : Controller
    {
        private readonly Data.DeveloperID _developer;

        public TockenController(IOptions<Data.DeveloperID> optionsAccessor)
        {
            _developer = optionsAccessor.Value;
        }

        [HttpGet]
        [Route("api/forge/token")]
        public async Task<string> GetToken()
        {
            TwoLeggedApi oauthApi = new TwoLeggedApi();
            dynamic bearer = await oauthApi.AuthenticateAsync(
                "3uIC6EV2VLsCQSe4Kk2BWSaF5i7Y3nAu",
                "Uk5sTWS2Fv0HW12L",
                "client_credentials",
                new Scope[] {Scope.DataRead});

            return (string) bearer.access_token;
        }
    }
}