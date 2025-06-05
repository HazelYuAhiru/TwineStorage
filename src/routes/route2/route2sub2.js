import React from 'react';
import { useNavigate } from 'react-router-dom';
import { route2_2, route2sub2CastInfo } from '../../data/route2';
import RPGDialogueDisplay from '../../components/RPGDialogueDisplay';


export default function Route2Sub2() {
  const navigate = useNavigate();

  return (
    <div>
      <RPGDialogueDisplay 
        routeText={route2_2}
        leftCharacter={null} // You can add character image path here later
        rightCharacter={null} // You can add character image path here later
        conclusionText="春になった時、そこにはきれいなさくらの木がさきました。"
        castInfo={route2sub2CastInfo}
        routeId="route2_2"
        onLastKeywordClick={() => {
          navigate('/');
        }}
      />
    </div>
  );
}