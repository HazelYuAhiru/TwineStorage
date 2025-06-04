import React from 'react';
import { route2_2, route2CastInfo } from '../../data/route2';
import RPGDialogueDisplay from '../../components/RPGDialogueDisplay';


export default function Route2Sub2() {
  return (
    <div>
      <RPGDialogueDisplay 
        routeText={route2_2}
        leftCharacter={null} // You can add character image path here later
        rightCharacter={null} // You can add character image path here later
        conclusionText="小さな願いが、\n大きな奇跡を生む"
        castInfo={route2CastInfo}
        routeId="route2_2"
        onLastKeywordClick={() => {
          window.location.href = '/';
        }}
      />
    </div>
  );
}