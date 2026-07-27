import Card from "./Card";

const StatCard = ({ icon, title, value }) => {
  return (
    <Card className="flex items-center gap-4">
      <div className="text-4xl">{icon}</div>

      <div>
        <h3 className="text-cyan-200">
          {title}
        </h3>

        <h2 className="text-3xl font-bold">
          {value}
        </h2>
      </div>
    </Card>
  );
};

export default StatCard;