import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchSettings } from '../../storage';
import Button from '../component/Button';
import { BASE_PATH } from '../const';

function Index(): JSX.Element {
  const [groupNames, setGroupNames] = useState<Array<string>>([]);
  useEffect(() => {
    const init = async () => {
      const settings = await fetchSettings();
      setGroupNames(Object.keys(settings));
    };
    init().then();
  });

  const addCurrentUrlToStore = () => 'b';

  return (
    <>
      <ul>
        {groupNames.map((group) => (
          <li key={group}>
            <Link to={`${BASE_PATH}/groups/${group}`}>{group}</Link>
          </li>
        ))}
      </ul>
      <Button onClick={addCurrentUrlToStore}>
        グループを追加
      </Button>
    </>
  );
}

export default Index;
