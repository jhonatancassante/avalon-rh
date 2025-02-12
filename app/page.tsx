import { Button } from "./_components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
    return (
        <div>
            <Button>Eita</Button>
            <FontAwesomeIcon icon={faGoogle} style={{ fontSize: "10px" }} />
        </div>
    );
}
