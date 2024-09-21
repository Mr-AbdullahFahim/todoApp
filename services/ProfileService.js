import Profile from "../models/Profile"
import AsyncStorageService from "./AsyncStorageService"


export default {

    createNewProfile: async (gotProfile) => {
        
        if(gotProfile.name == '' || gotProfile.color == ''){
            return {
                success: false,
                message: "Please fill out all the fields"
            }
        }

        let newProfile = new Profile(gotProfile.name , gotProfile.color)

        await AsyncStorageService.addNewProfile(newProfile)

        return {
            success: true,
            message: newProfile
        }

    },

    loadProfiles: async () => {
        let profiles = await AsyncStorageService.getAllProfiles()
        return profiles
    },

    deleteProfile: async (profileId) => {
        await AsyncStorageService.deleteProfile(profileId)
        return true
    }

}