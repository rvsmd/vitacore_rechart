import React, { useEffect, useState } from 'react';
import CharactersAPI from 'src/api/CharactersAPI';
import PieChartDiagram from 'src/components/layouts/PieChartDiagram';
import BDatepicker from 'src/components/ui/BDatepicker';
import CharactersHouse from 'src/models/enums/CharactersHouseEnum';
import styles from './style.module.scss';

interface ICharacter {
    id: string;
    name: string;
    alternate_names: string[];
    species: string;
    gender: string;
    house: CharactersHouse;
    dateOfBirth: string;
    yearOfBirth: string;
    wizard: boolean;
    ancestry: string;
    eyeColour: string;
    hairColour: string;
    wand: { wood: string; core: string; length: number };
    patronus: string;
    hogwartsStudent: boolean;
    hogwartsStaff: boolean;
    actor: string;
    alternate_actors: string[];
    alive: boolean;
    image: string;
}

const Main = () => {
    const [characters, setCharacters] = useState<ICharacter[] | []>([]);
    const [chartData, setChartData] = useState<{ name: string; value: number }[] | []>([]);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const getCharacters = () => {
        CharactersAPI.getCharacters()
            .then((response) => {
                setCharacters(response.data as ICharacter[]);
            })
            .catch((error) => {
                console.log('error - ', error);
            });
    };

    const getNumberFilterCharacters = (charactersHouse: CharactersHouse) => {
        if (!startDate || !endDate) return 0;
        return characters.filter(
            (item) =>
                item.house === charactersHouse &&
                item.dateOfBirth &&
                new Date(item.dateOfBirth.split('-').reverse().join('-')).getTime() > new Date(startDate).getTime() &&
                new Date(item.dateOfBirth.split('-').reverse().join('-')).getTime() < new Date(endDate).getTime(),
        ).length;
    };

    const confirm = () => {
        setChartData([
            { name: CharactersHouse.GRYFFINDOR, value: getNumberFilterCharacters(CharactersHouse.GRYFFINDOR) },
            { name: CharactersHouse.SLYTHERIN, value: getNumberFilterCharacters(CharactersHouse.SLYTHERIN) },
            { name: CharactersHouse.RAVENCLAW, value: getNumberFilterCharacters(CharactersHouse.RAVENCLAW) },
            { name: CharactersHouse.HUFFLEPUFF, value: getNumberFilterCharacters(CharactersHouse.HUFFLEPUFF) },
        ]);
    };

    useEffect(() => {
        getCharacters();
    }, []);

    return (
        <div>
            <div className={styles['filter-container']}>
                <h2>Дата рождения</h2>
                <BDatepicker label='С' date={startDate} setDate={setStartDate} />
                <BDatepicker label='По' date={endDate} setDate={setEndDate} />
                <button style={{ height: 30, width: 100 }} onClick={confirm}>
                    Подтвердить
                </button>
            </div>
            <div style={{ height: 300, width: 400 }}>
                <PieChartDiagram data={chartData} />
            </div>
        </div>
    );
};

export default Main;
