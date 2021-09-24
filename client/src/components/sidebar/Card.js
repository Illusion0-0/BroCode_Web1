function Card({ props }) {
  return (
    <div>
      <div>{props.title}</div>
      <div>Created on {props.created}</div>
      <div>
        Tags:{" "}
        {props.tags.map((tag, index) => (
          <span key={index}> {tag},</span>
        ))}
      </div>
    </div>
  );
}

export default Card;
