import { useNavigate } from "react-router-dom";
import StoryDisplay from "../components/storyDisplay";
import { commonRoute } from "../data/common";

export default function Common() {
    const navigate = useNavigate();
    
    const handleCommonRouteComplete = () => {
        navigate('/choice');
    };

    return (
        <div>
            <StoryDisplay 
                routeText={commonRoute} 
                onLastKeywordClick={handleCommonRouteComplete}
            />
        </div>
    );
}