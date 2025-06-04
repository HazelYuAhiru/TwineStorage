import React from 'react';
import { useNavigate } from 'react-router-dom';
import RPGDialogueDisplay from '../../components/RPGDialogueDisplay';
import { route1 } from '../../data/route1';

export default function Route1() {
  const navigate = useNavigate();

  const handleLastKeywordClick = () => {
    navigate('/route1/choice');
  };

  return (
    <div>
        <RPGDialogueDisplay 
          routeText={route1} 
          leftCharacter={null}
          rightCharacter={null}
          onLastKeywordClick={handleLastKeywordClick}
        />
    </div>
  );
}
