export const getImages = async () => {
    const response = fetch('https://boiling-refuge-66454.herokuapp.com/images')
    const result = await ((await response).json())
    return result
}

export const getImage = async (id) => {
    const response = fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
    const result = await ((await response).json())
    return result
}

export const postComment = async (id, name, comment) => {
    const response = await 
    fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ name, comment }),
        headers: {
          'Content-Type': 'application/json'
        }
    });
}