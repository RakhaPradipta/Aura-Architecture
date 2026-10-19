namespace Aura.Api.Models;

public class CreateTeamMemberRequest
{
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Bias { get; set; } = string.Empty;
    public string BiasDescription { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string Education { get; set; } = string.Empty;
    public string Experience { get; set; } = string.Empty;
    public List<string> NotableProjects { get; set; } = new();
    public string Image { get; set; } = string.Empty;
    public SocialLinks Social { get; set; } = new();

    public TeamMember ToTeamMember()
    {
        return new TeamMember
        {
            Slug = Slug,
            Name = Name,
            Role = Role,
            Bias = Bias,
            BiasDescription = BiasDescription,
            Bio = Bio,
            Education = Education,
            Experience = Experience,
            NotableProjects = NotableProjects,
            Image = Image,
            Social = Social
        };
    }
}
