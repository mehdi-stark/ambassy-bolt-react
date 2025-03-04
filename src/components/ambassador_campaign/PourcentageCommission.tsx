import { Card } from "react-bootstrap";

const PourcentageCommission = ({ selectedCommission, onClick }) => {
  return (
    // <div className="flex space-x-4 overflow-x-auto">
    //   {["10%", "15%", "20%", "Custom"].map((commission) => (
    //     <Card
    //       key={commission}
    //       className={`cursor-pointer w-48 ${
    //         selectedCommission === commission ? "border-2" : "border"
    //       }`}
    //       style={{
    //         borderColor: selectedCommission === commission ? "blue" : "red",
    //       }}
    //       onClick={() => onClick(commission)}
    //     >
    //       <Card.Body>
    //         <Card.Text className="text-md font-bold">{commission}</Card.Text>
    //       </Card.Body>
    //     </Card>
    //   ))}
    // </div>

    <section className="mb-4 w-full flex flex-col">
      <h2 className="text-lg md:text-xl font-semibold mb-2">
        Pourcentage de commission <span className="text-red-500">*</span>
      </h2>
      <div className="flex space-x-4 overflow-x-auto">
        {["10%", "15%", "20%", "Custom"].map((commission) => (
          <Card
            key={commission}
            className={`cursor-pointer w-32 md:w-48 ${
              selectedCommission === commission
                ? "border-2 border-blue-500"
                : "border border-gray-200"
            }`}
            onClick={() => handleCommissionSelect(commission)}
          >
            <Card.Body>
              <Card.Text className="text-sm md:text-md font-bold">
                {commission}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PourcentageCommission;
