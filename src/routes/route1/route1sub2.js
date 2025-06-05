import React from 'react';
import { useNavigate } from 'react-router-dom';
import { route1_2, route1sub2CastInfo } from '../../data/route1';
import RPGDialogueDisplay from '../../components/RPGDialogueDisplay';


export default function Route1Sub2() {
  const navigate = useNavigate();

  return (
    <div>
      <RPGDialogueDisplay 
        routeText={route1_2}
        leftCharacter={null} 
        rightCharacter={null} 
        conclusionText="人とねこが手をつなぎ、みんなでしあわせになりました。"
        castInfo={route1sub2CastInfo}
        routeId="route1_2"
        onLastKeywordClick={() => {
          navigate('/');
        }}
      />
    </div>
  );
}