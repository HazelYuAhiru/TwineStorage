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
        conclusionText="やさしさは、思いがけない\n幸せを運んでくれる"
        castInfo={route2CastInfo}
        onLastKeywordClick={() => {
          window.location.href = '/';
        }}
      />
    </div>
  );
}
