import { Card } from "react-bootstrap";

const PourcentageCommission = ({ selectedCommission, onClick }) => {
  <div className="flex space-x-4">
    {["10%", "15%", "20%", "Custom"].map((commission) => (
      <Card
        key={commission}
        className={`cursor-pointer w-48 ${
          selectedCommission === commission ? "border-2" : "border"
        }`}
        style={{
          borderColor: selectedCommission === commission ? "blue" : "red",
        }}
        onClick={() => onClick(commission)}
      >
        <Card.Body>
          <Card.Text className="text-md font-bold">{commission}</Card.Text>
        </Card.Body>
      </Card>
    ))}
  </div>;
};

export default PourcentageCommission;
