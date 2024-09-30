import { useEffect, useMemo, useState } from 'react';
import { api } from '../../plugins/api';
import { IDepartmentGroupSummary, IUser, } from './model/UserModel';


function Assignment2Page() {
    /*  const summary = {
         [userData.company.department]: {
           male: gender === "male" ? 1 : 0,
           female: gender === "female" ? 1 : 0,
           ageRange: `${Math.floor(age / 10) * 10}-${Math.ceil(age / 10) * 10}`, // Range
           hair: {
             Black: hair.color === "Black" ? 1 : 0,
             Blond: hair.color === "Blond" ? 1 : 0,
             Chestnut: hair.color === "Chestnut" ? 1 : 0,
             Brown: hair.color === "Brown" ? 1 : 0
           },
           addressUser: {
             [`${firstName}${lastName}`]: address.postalCode
           }
         }
       }; */
    /*  const [departmentState, setDepartmentState] = useState<IDepartmentGroupSummary>({
         HR: {
             male: 5,
             female: 3,
             ageRange: "25-35",
             hair: {
                 Black: 2,
                 Blond: 1,
                 Chestnut: 2,
                 Brown: 3,
             },
             addressUser: {
                 TerryMedhurst: "XXXXX",
             },
         },
         Engineering: {
             male: 8,
             female: 2,
             ageRange: "30-40",
             hair: {
                 Black: 3,
                 Blond: 2,
                 Chestnut: 2,
                 Brown: 1,
             },
             addressUser: {
                 JohnDoe: "YYYYY",
             },
         },
     }); */

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

        console.log("summary complete", summary);

        return summary;
    };

    const items = useMemo(() => {
        if (!data || data.length === 0) {
            return [];
        }

        return transformDataGroup(data);
    }, [data]);


    useEffect(() => {
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

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Data from API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Assignment2Page