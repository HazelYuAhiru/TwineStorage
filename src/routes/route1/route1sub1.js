import React from 'react';
import { route1_1, route1CastInfo } from '../../data/route1';
import RPGDialogueDisplay from '../../components/RPGDialogueDisplay';


export default function Route1Sub1() {
  return (
    <div>
      <RPGDialogueDisplay 
        routeText={route1_1}
        leftCharacter={null} 
        rightCharacter={null}
        conclusionText="やさしさは、思いがけない\n幸せを運んでくれる"
        castInfo={route1CastInfo}
        onLastKeywordClick={() => {
          window.location.href = '/';
        }}
      />
    </div>
  );
}
