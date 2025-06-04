import React from 'react';
import { useNavigate } from 'react-router-dom';
import RPGDialogueDisplay from '../../components/RPGDialogueDisplay';
import { route2 } from '../../data/route2';

export default function Route2() {
  const navigate = useNavigate();

  const handleLastKeywordClick = () => {
    navigate('/route2/choice');
  };

  return (
    <div>
        <RPGDialogueDisplay 
          routeText={route2} 
          leftCharacter={null} // You can add character image path here later
          rightCharacter={null} // You can add character image path here later
          onLastKeywordClick={handleLastKeywordClick}
        />
    </div>
  );
}