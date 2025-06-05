import React from 'react';
import { useNavigate } from 'react-router-dom';
import { route1_1, route1sub1CastInfo } from '../../data/route1';
import RPGDialogueDisplay from '../../components/RPGDialogueDisplay';


export default function Route1Sub1() {
  const navigate = useNavigate();

  return (
    <div>
      <RPGDialogueDisplay 
        routeText={route1_1}
        leftCharacter={null} 
        rightCharacter={null}
        conclusionText="おじいさんとおばあさんは、しあわせなお正月をすごしました。"
        castInfo={route1sub1CastInfo}
        routeId="route1_1"
        onLastKeywordClick={() => {
          navigate('/');
        }}
      />
    </div>
  );
}
