import React from 'react';
import { useNavigate } from 'react-router-dom';
import { route2_1, route2sub1CastInfo } from '../../data/route2';
import RPGDialogueDisplay from '../../components/RPGDialogueDisplay';


export default function Route2Sub1() {
  const navigate = useNavigate();

  return (
    <div>
      <RPGDialogueDisplay 
        routeText={route2_1}
        leftCharacter={null} // You can add character image path here later
        rightCharacter={null} // You can add character image path here later
        conclusionText="ほんとうのしあわせは、お金ではなく、家族とすごす時間でした。"
        castInfo={route2sub1CastInfo}
        routeId="route2_1"
        onLastKeywordClick={() => {
          navigate('/');
        }}
      />
    </div>
  );
}
