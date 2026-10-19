using Aura.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif" };
    private const long MaxFileSize = 10 * 1024 * 1024; // 10 MB

    public UploadController(IWebHostEnvironment env)
    {
        _env = env;
    }

    [Authorize]
    [HttpPost("image")]
    [RequestSizeLimit(MaxFileSize)]
    public ActionResult<ApiResponse<UploadResponse>> UploadImage(IFormFile file)
    {
        if (file is null || file.Length == 0)
            return BadRequest(ApiResponse<UploadResponse>.Fail("No file uploaded."));

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(ext))
            return BadRequest(ApiResponse<UploadResponse>.Fail(
                $"File type '{ext}' is not allowed. Allowed types: {string.Join(", ", AllowedExtensions)}"));

        // Create date-based subdirectory
        var dateFolder = DateTime.UtcNow.ToString("yyyy/MM");
        var uploadDir = Path.Combine(_env.WebRootPath, "uploads", dateFolder);
        Directory.CreateDirectory(uploadDir);

        // Generate unique filename
        var fileName = $"{Guid.NewGuid():N}{ext}";
        var filePath = Path.Combine(uploadDir, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            file.CopyTo(stream);
        }

        var relativeUrl = $"/uploads/{dateFolder}/{fileName}";
        var fullUrl = $"{Request.Scheme}://{Request.Host}{relativeUrl}";

        return Ok(ApiResponse<UploadResponse>.Ok(new UploadResponse
        {
            Url = relativeUrl,
            FileName = fileName,
            OriginalName = file.FileName,
            Size = file.Length,
            ContentType = file.ContentType
        }, "Image uploaded successfully."));
    }

    [Authorize]
    [HttpDelete("image")]
    public ActionResult<ApiResponse<object>> DeleteImage([FromQuery] string path)
    {
        if (string.IsNullOrWhiteSpace(path))
            return BadRequest(ApiResponse<object>.Fail("Path is required."));

        // Security: only allow deleting files inside uploads directory
        if (!path.StartsWith("/uploads/"))
            return BadRequest(ApiResponse<object>.Fail("Invalid path."));

        var fullPath = Path.Combine(_env.WebRootPath, path.TrimStart('/'));
        if (!System.IO.File.Exists(fullPath))
            return NotFound(ApiResponse<object>.Fail("File not found."));

        System.IO.File.Delete(fullPath);
        return Ok(ApiResponse<object>.Ok(new { }, "Image deleted successfully."));
    }
}

public class UploadResponse
{
    public string Url { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string OriginalName { get; set; } = string.Empty;
    public long Size { get; set; }
    public string ContentType { get; set; } = string.Empty;
}
