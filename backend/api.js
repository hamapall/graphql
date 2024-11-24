// function to make a GraphQL request
async function makeGraphQLRequest(query, JWToken) {
    const response = await fetch('https://01.kood.tech/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${JWToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });

    if (!response.ok) {
        console.error("Error in response:", response.statusText);
        return null;
    }

    return await response.json();
}

// Fetch user data
export async function fetchUserData(JWToken) {
    const query = `{
        user {
            id
            login
            attrs
            
        }
    }`;

    try {
        const data = await makeGraphQLRequest(query, JWToken);
            return data; // Return the data directly
    } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.clear();
        return null;
    }
}

// Fetch transactions
export async function fetchTransactions(JWToken) {
    const query = `{
        transaction {
            amount
            type
            path
        }
    }`;

    try {
        const data = await makeGraphQLRequest(query, JWToken);
        console.log("Fetched transactions:", data);
        return data?.data?.transaction || [];
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
}
