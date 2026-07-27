import Header from "../components/header.js";
import Status from "../components/status.js";
import inputCard from "../components/inputCard.js";
export default function Home() {
    return `
        ${Header()}
        ${Status()}
        ${inputCard()}
        

    `;
}