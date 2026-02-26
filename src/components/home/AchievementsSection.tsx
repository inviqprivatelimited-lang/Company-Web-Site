import { Trophy, Award, Medal, Star } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Best Social Impact Award",
    event: "Code With WIE 2025",
    issuer: "IEEE WIE Student Branch - University of Moratuwa",
    image: "/WIE.jpeg",
  },
  {
    icon: Medal,
    title: "2nd Runner Up",
    event: "CODEFEST 2025",
    issuer: "Sri Lanka Institute of Information Technology",
    image: "/codefest.jpeg",
  },
  {
    icon: Award,
    title: "Finalist",
    event: "Mobitel Codeblast Hackathon 2025",
    issuer: "Mobitel",
    image: "/codeblast.jpeg",
  },
  // {
  //   icon: Star,
  //   title: "Finalist",
  //   event: "Hackelite V2",
  //   issuer: "University of Moratuwa",
  // },
  // {
  //   icon: Award,
  //   title: "Semifinalist",
  //   event: "Hackx 2025",
  //   issuer: "University of Kelaniya",
  // },
];

const AchievementsSection = () => {
  const withImages = achievements.filter((a) => a.image);
  const withoutImages = achievements.filter((a) => !a.image);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Our <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognition of our commitment to innovation and excellence
          </p>
        </div>

        {/* Featured Achievements with Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {withImages.map((achievement, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 group"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={achievement.image}
                  alt={achievement.event}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Info */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <achievement.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-1">
                      {achievement.event}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {achievement.issuer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Achievements without Images - uncomment when images are available */}
        {withoutImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {withoutImages.map((achievement, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <achievement.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-1">
                      {achievement.event}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {achievement.issuer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AchievementsSection;
