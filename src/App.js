import { useState, useEffect } from "react";
import "./App.css";
//import { Component } from "react";
import CardList from "./components/card-list/card-list-component";
import SearchBox from "./components/search-box/search-file-component";

const App = () => {
  const [searchField, setSearchField] = useState(""); // [value, setValue]
  const [monsters, setMonsters] = useState([]); // [value, setValue]
  const [filteredMonsters, setFilterMonsters] = useState(monsters); // [value, setValue]
  console.log("render");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users") //pegar dados
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      // como search field está trocando o objeto, ele chama render novamente e essa funcao consegue ser executada
      //true ou falso pra cada um
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      ></SearchBox>{" "}
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

//fazendo com class component
// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
//     //quando o componente for montado pela primeira vez
//     fetch("https://jsonplaceholder.typicode.com/users") //pegar dados
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(
//           () => {
//             return { monsters: users };
//           },
//           () => {}
//         )
//       );
//   }

//   onSearchChange = (event) => {
//     // criou essa funcao para otimizacao só cria uma vez e pronto
//     //const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField: event.target.value.toLocaleLowerCase() }; // searchField: searchField
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state; // fez essas campos pra não ficar utilizando this toda hora
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       // como search field está trocando o objeto, ele chama render novamente e essa funcao consegue ser executada
//       //true ou falso pra cada um
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox
//           className="monsters-search-box"
//           onChangeHandler={onSearchChange}
//           placeholder="search monsters"
//         ></SearchBox>
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;

/* IMPORTANTISSIMO

//Problema do objeto antigo do gta dourado

 <button
            onClick={() => {
              this.setState(
                () => {
                  return {
                    name: { firstName: "Andrei", lastName: "Neaogoi" },
                  };
                },
                () => {
                  console.log(this.state);
                }
              );
            }}
          >
            Change Name
          </button>


  //será que consigo fazer isso em campos do modal?

{this.state.monsters.map((monster) => {
          return <h1>{monster.name}</h1>;
        })}


// problema do warning unique key 
//coloqueio id no h1

 monsters: [
        {
          id: "83tbw8fihweb",
          name: "Linda",
        },
 return <h1 key={monster.id}>{monster.name}</h1>;




*/
