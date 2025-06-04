import StoryDisplay from "../components/storyDisplay";
import { commonRoute } from "../data/common";
import { markRouteComplete } from "../utils/completionTracker";

export default function Common() {
    const handleCommonRouteComplete = () => {
        // Mark common route as complete
        markRouteComplete('common');
        // Navigate to choice page as usual
        window.location.href = '/choice';
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