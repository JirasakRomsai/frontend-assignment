import { useEffect, useMemo, useState } from 'react';
import { api } from '../../plugins/api';
import { IDepartmentGroupSummary, IUser, } from './model/UserModel';
import { json } from 'react-router-dom';


function Assignment2Page() {
    const [data, setData] = useState<Array<IUser> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);



    const transformDataGroup = (items: Array<IUser>): IDepartmentGroupSummary => {
        const summary: IDepartmentGroupSummary = {};

        items.forEach(user => {
            const { company, gender, age, hair, firstName, lastName } = user;
            const { department } = company
            const { postalCode } = user.address

            if (!summary[department]) {
                summary[department] = {
                    male: 0,
                    female: 0,
                    ageRange: '0-0',
                    hair: {},
                    addressUser: {},
                };
            }

            if (gender === 'male') {
                summary[department].male += 1;
            } else if (gender === 'female') {
                summary[department].female += 1;
            }
            let ageSplit: Array<string> = summary[department].ageRange.split("-")
            const minAge = Number(ageSplit[0]) === 0 ? age : Math.min(Number(ageSplit[0]), age)
            const maxAge = Number(ageSplit[1])


            summary[department].ageRange = `${minAge}-${Math.max(maxAge, age)}`;

            if (hair.color in summary[department].hair) {
                summary[department].hair[hair.color] += 1
            } else {
                summary[department].hair[hair.color] = 1
            }

            summary[department].addressUser[`${firstName}${lastName}`] = postalCode;

        });

        return summary;
    };

    const itemsTransform: IDepartmentGroupSummary | [] = useMemo(() => {
        if (!data || data.length === 0) {
            return [];
        }

        return transformDataGroup(data);
    }, [data]);


    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            const response = await api.get<any>('/users'); // เรียก API endpoint

            setData(response.data.users);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    console.log("itemsTransform ",itemsTransform);
    

    return (
        <div>
            <h1>Data from API:</h1>
            {Object.entries(itemsTransform).map(([key, value])=>(
                 <div key={key}>
                 <b>{key}:</b> {JSON.stringify(value)}
               </div>
            ))}
        </div>
    );
}

export default Assignment2Page