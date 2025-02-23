import google.generativeai as gen_ai # imports the google library with generativeai as gen_ai

# with open("key.txt", 'r') as file:
#     API_KEY = file.read()

# # configures the api_key using genai with the configure command 
# gen_ai.configure(api_key = API_KEY)
gen_ai.configure(api_key = "AIzaSyAPKN68FAAmwhlkkh3firvHuoMGLC_AgaU")


# function header for the get_sub_species_info_from_LLM with the parameter species_info 
def get_sub_species_info_from_LLM(species_info):
    
    # initializes the AI model gemini_1.5-flash using GenerativeModel command from gen_ai
    ai_model = gen_ai.GenerativeModel("gemini-1.5-flash") # Note: gemini-1.5-flash is the AI Model 

    # generates the response of the AI model using generate_content command with the gen_ain variable 
    # in the parentheisis, we are using a Python f-string, prevents the need for concatenating 
    response = ai_model.generate_content(f"Create a short one paragraph description that details the basic facts of this plant including historic usage and basic featues of the plant {species_info}")

    # returns the response variable at the .text command, hassattr is a function that is built-in Python that 
    # will return True if the object, response has a attribute, else it will print: A response has not been recieved
 
    return response.text if hasattr(response, "text") else "A response has not been recieved"

if __name__ == "__main__": # creates the main method here 
    # tests the fucntion by calling it in the main method 
    print(get_sub_species_info_from_LLM("Sphagnum missouricum"))
