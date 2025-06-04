import React from 'react';
import { route2_1, route2CastInfo } from '../../data/route2';
import RPGDialogueDisplay from '../../components/RPGDialogueDisplay';


export default function Route2Sub1() {
  return (
    <div>
      <RPGDialogueDisplay 
        routeText={route2_1}
        leftCharacter={null} // You can add character image path here later
        rightCharacter={null} // You can add character image path here later
        conclusionText="本当の幸せは、\n家族と過ごす時間にある"
        castInfo={route2CastInfo}
        routeId="route2_1"
        onLastKeywordClick={() => {
          window.location.href = '/';
        }}
      />
    </div>
  );
}
