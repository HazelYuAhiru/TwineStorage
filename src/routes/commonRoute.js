import StoryDisplay from "../components/storyDisplay";
import { commonRoute } from "../data/common";

export default function Common() {
    return (
        <div>
            <StoryDisplay routeText={commonRoute} />
        </div>
    );
}