import * as api from '../../api'
export const LOAD_FREINDS_REQEST='LOAD_FREINDS_REQEST'
export const LOAD_FREINDS_RESPONSE='LOAD_FREINDS_RESPONSE'
export const LOAD_FREINDS_ERROR='LOAD_FREINDS_ERROR'

export const loadFriends = ()=>async(dispatch, getstState)=>{
    dispatch({type:LOAD_FREINDS_REQEST})
    const response = await api.getFriends()
    console.log('loadFriends', response)
}
