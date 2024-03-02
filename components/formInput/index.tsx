export default function FormInput({ label, inputType = "input", required }) {
  return (
    <div className="grid grid-rows-1 my-2 grid-cols-[80px_200px]">
      <label>{`${label}:`}</label>
      {inputType === "input" ? (
        <input
          name={label.toLowerCase()}
          type="text"
          required={required}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      ) : (
        <textarea
          name={label.toLowerCase()}
          required={required}
          placeholder={`Enter ${label.toLowerCase()}`}
        ></textarea>
      )}
    </div>
  );
}
