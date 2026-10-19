using Aura.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Aura.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public partial class ContactController : ControllerBase
{
    private readonly ILogger<ContactController> _logger;

    public ContactController(ILogger<ContactController> logger)
    {
        _logger = logger;
    }

    // Static compiled regex: sekali compile, bukan per-request
    [GeneratedRegex(@"^[^\s@]+@[^\s@]+\.[^\s@]+$")]
    private static partial Regex EmailRegex();

    [HttpPost]
    public ActionResult<ApiResponse<object>> Submit([FromBody] ContactRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name) ||
            string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.ProjectType) ||
            string.IsNullOrWhiteSpace(request.Message))
        {
            return BadRequest(ApiResponse<object>.Fail("All fields are required."));
        }

        if (!EmailRegex().IsMatch(request.Email))
        {
            return BadRequest(ApiResponse<object>.Fail("Invalid email address."));
        }

        // In production, you would:
        // 1. Send an email via a service (e.g., Resend, SendGrid)
        // 2. Store in a database
        // 3. Send a Slack notification

        _logger.LogInformation("New contact form submission: {Name} <{Email}> - {Type}",
            request.Name, request.Email, request.ProjectType);

        return Ok(ApiResponse<object>.Ok(new { }, "Thank you! We'll be in touch within 24 hours."));
    }
}
