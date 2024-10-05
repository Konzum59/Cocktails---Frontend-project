import styles from "./IngredientData.module.css";

interface IngredientDataProps {
  description: string;
  alcohol: boolean;
  type: string;
  percentage: number | null;
  imageUrl: string;
  name: string;
}

const IngredientData: React.FC<IngredientDataProps> = ({
  description,
  alcohol,
  type,
  percentage,
  imageUrl,
  name,
}) => {
  return (
    <>
      <div className={styles.ingredientContainer}>
        {!imageUrl ? null : (
          <img
            src={imageUrl}
            alt={`Unable to load picture of ${name}`}
            width="250px"
          />
        )}
        <p> {description ? description : null} </p>
        <p>
          {" "}
          {percentage
            ? `It contains about ${percentage}% of alcohol`
            : alcohol
            ? "It's unclear if it has alcohol"
            : "It doesn't contain any alcohol "}{" "}
        </p>
        <p>It's the type of: {type ? type : "No data"}</p>
      </div>
    </>
  );
};
export default IngredientData;
