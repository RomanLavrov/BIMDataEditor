using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Autodesk.Forge;
using System.IO;
using System.Net;
using Autodesk.Forge.Model;
using Microsoft.Extensions.Configuration;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Extensions.Options;

namespace BIMDataEditor.Controllers
{
    public class HomeController : Controller
    {
        private readonly Data.DeveloperID _developer;

        public HomeController(IOptions<Data.DeveloperID> optionsAccessor)
        {
            _developer = optionsAccessor.Value;
        }

        public IActionResult Index(string URN)
        {
            return View((object)URN);
        }

        [HttpPost("Home/Upload")]
        public async Task<IActionResult> Post(IFormFile file)
        {
            string fileName = string.Empty;
            //Create Bucket Name
            string bucketKey = "forgeapp" + Guid.NewGuid().ToString("N").ToLower();

            string tempFilePath = Path.GetTempFileName();
            if (file == null || file.Length == 0)
            {
                byte[] data;
                string preloadURL = "https://forgefiles.blob.core.windows.net/forgefiles/CC303_170830_16035_4000ff%20Werkplan_V006.nwc";

                using (WebClient client = new WebClient())
                {
                    data = client.DownloadData(preloadURL);
                    Stream stream = new MemoryStream();
                    stream.Write(data, 0, data.Length);
                    FormFile f = new FormFile(stream, 0, data.Length, "test", "FireDetectorsForge.nwc");

                    file = f;
                }
                //return Content("File not found");
            }

            fileName = file.FileName;

            if (file.Length > 0)
            {
                using (var stream = new FileStream(tempFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            //Get Token
            TwoLeggedApi oauthApi = new TwoLeggedApi();

            dynamic bearer = await oauthApi.AuthenticateAsync(
                "3uIC6EV2VLsCQSe4Kk2BWSaF5i7Y3nAu",
                "Uk5sTWS2Fv0HW12L",
                //_developer.forgeClientId,
                //_developer.forgeClientSecret,
                "client_credentials",
                new Scope[] { Scope.BucketCreate, Scope.DataCreate, Scope.DataWrite, Scope.DataRead });

            //Create Forge Bucket
            PostBucketsPayload postBucket = new PostBucketsPayload(bucketKey, null, PostBucketsPayload.PolicyKeyEnum.Transient);
            BucketsApi bucketApi = new BucketsApi();
            bucketApi.Configuration.AccessToken = bearer.access_token;

            dynamic newBucket = await bucketApi.CreateBucketAsync(postBucket);

            //Upload File
            ObjectsApi objectsApi = new ObjectsApi();
            oauthApi.Configuration.AccessToken = bearer.access_token;
            dynamic newObject;
            using (StreamReader fileStream = new StreamReader(tempFilePath))
            {
                newObject = await objectsApi.UploadObjectAsync(bucketKey, fileName, (int)fileStream.BaseStream.Length,
                    fileStream.BaseStream, "application/octet-stream"); //TODO add comment
            }

            //Translate File
            string objectIdBase64 = ToBase64(newObject.objectId);
            List<JobPayloadItem> postTranslationOutput = new List<JobPayloadItem>()
            {
                new JobPayloadItem(
                    JobPayloadItem.TypeEnum.Svf, new List<JobPayloadItem.ViewsEnum>()
                    {
                        JobPayloadItem.ViewsEnum._2d,
                        JobPayloadItem.ViewsEnum._3d
                    })
            };

            JobPayload postTranslation = new JobPayload(
                new JobPayloadInput(objectIdBase64),
                new JobPayloadOutput(postTranslationOutput));

            DerivativesApi derivativeApi = new DerivativesApi();
            derivativeApi.Configuration.AccessToken = bearer.access_token;
            dynamic translation = await derivativeApi.TranslateAsync(postTranslation);

            //Translation finish check
            int progress = 0;
            do
            {
                System.Threading.Thread.Sleep(1000);
                try
                {
                    dynamic manifest = await derivativeApi.GetManifestAsync(objectIdBase64);
                    progress = (string.IsNullOrEmpty(Regex.Match(manifest.progress, @"\d+").Value)
                        ? 100
                        : Int32.Parse(Regex.Match(manifest.progress, @"\d+").Value));
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine("Error in translation: " + ex.Message);
                }
            } while (progress < 100);

            //Delete temp file
            System.IO.File.Delete(tempFilePath);

            return RedirectToAction("Index", new { URN = (object)objectIdBase64 });
        }

        public string ToBase64(string input)
        {
            var plainText = System.Text.Encoding.UTF8.GetBytes(input);
            return System.Convert.ToBase64String(plainText);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }


    }
}
