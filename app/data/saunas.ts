export interface Sauna {
  id: number;
  name: string;
  capacity: string;
  temp: string;
  duration: string;
  price: string;
  tag: string;
  desc: string;
}

export const SAUNAS: Sauna[] = [
  {
    id: 1,
    name: "Bjørkehytta",
    capacity: "Opptil 6 personer",
    temp: "80–100°C",
    duration: "Fra 2 timer",
    price: "Fra 490 kr",
    tag: "Mest populær",
    desc: "Tradisjonell finsk røykbadstue omgitt av skog. Bjørketre interiør, vedovn og et kaldt dykk i naturlig vann like utenfor døren.",
  },
  {
    id: 2,
    name: "Fjordsuiten",
    capacity: "Opptil 4 personer",
    temp: "70–90°C",
    duration: "Fra 2 timer",
    price: "Fra 390 kr",
    tag: "Panoramautsikt",
    desc: "En privat tønnebadstue med glassfasade over fjorden. Storslått utsikt, infrarød varme og en privat terrasse kun for deg.",
  },
  {
    id: 3,
    name: "Steinlodgen",
    capacity: "Opptil 10 personer",
    temp: "85–110°C",
    duration: "Fra 3 timer",
    price: "Fra 790 kr",
    tag: "Gruppe og arrangement",
    desc: "En raus steinbadstue bygget for selskaper. Støpejernsovn, kaldtvannskar, garderobe og privat lounge er inkludert.",
  },
];