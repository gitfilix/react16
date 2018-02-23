function Person (props) {
  return (
    <div className="person">
      <h1>{props.name}</h1>
      <p>Age: {props.age}</p>
    </div>
  );
}

let app = (
  <div>
    <Person name="May" age="32" />
    <Person name="Schakria" age="34" />
  </div>
)

ReactDOM.render(app,
document.querySelector('#app')
);
