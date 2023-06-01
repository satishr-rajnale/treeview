import Treeview from "./Treeview";
import "./App.css";
const data = [
  {
    key: "mammal",
    label: "Mammal",
    isFolder: true,
    checked: false,
    hasChildren: true,
    nodes: [
      {
        key: "canidae",
        label: "Canidae",
        checked: false,
        hasChildren: true,

        nodes: [
          {
            key: "dog",
            label: "Dog",
            checked: false,
            hasChildren: false,

            nodes: [],
            url: "https://www.google.com/search?q=dog",
          },
          {
            key: "fox",
            label: "Fox",
            checked: false,
            hasChildren: false,
            nodes: [],
            url: "https://www.google.com/search?q=fox",
          },
          {
            key: "wolf",
            label: "Wolf",
            checked: false,
            hasChildren: false,

            nodes: [],
            url: "https://www.google.com/search?q=wolf",
          },
        ],
        url: "https://www.google.com/search?q=canidae",
      },
    ],
    url: "https://www.google.com/search?q=mammal",
  },
  {
    key: "reptile",
    label: "Reptile",
    isFolder: true,
    checked: false,
    hasChildren: true,

    nodes: [
      {
        key: "squamata",
        label: "Squamata",
        checked: false,
        hasChildren: true,
        nodes: [
          {
            key: "lizard",
            label: "Lizard",
            checked: false,
            hasChildren: false,
            nodes: [],
            url: "https://www.google.com/search?q=lizard",
          },
          {
            key: "snake",
            label: "Snake",
            hasChildren: false,
            checked: false,
            nodes: [],
            url: "https://www.google.com/search?q=snake",
          },
          {
            key: "gekko",
            label: "Gekko",
            checked: false,
            hasChildren: false,
            nodes: [],
            url: "https://www.google.com/search?q=gekko",
          },
        ],
        url: "https://www.google.com/search?q=squamata",
      },
    ],
    url: "https://www.google.com/search?q=reptile",
  },
];
export default function App() {
  return (
    <div className="App">
      <div className="heading">
        <div>
          <ion-icon name="stats-chart-outline"></ion-icon>
        </div>
        <div>Statistics</div>
      </div>
      <Treeview familyTree={data} />
    </div>
  );
}
