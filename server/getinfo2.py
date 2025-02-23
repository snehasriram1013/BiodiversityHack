from collections import defaultdict
import json
import requests
import random
from collections import defaultdict
from llm import get_sub_species_info_from_LLM

GBIF_API_URL = "https://api.gbif.org/v1/occurrence/search"

def func1(stateProvince=None, county=None, locality=None, municipality=None):
    params = {
        "limit": 100,
        "country": ["US"],
        "datasetKey": ["861e6afe-f762-11e1-a439-00145eb45e9a"],
    }

    # if stateProvince:
    #     params["stateProvince"] = stateProvince
    # if county:
    #     params["county"] = county
    # if locality:
    #     params["locality"] = locality
    # if municipality:
    #     params["municipality"] = municipality
    
    # update the params list
    response = requests.get(GBIF_API_URL, params=params)

    data = response.json()
    results = data.get("results", [])

    final_data = {"genuses": []}
    genus_map = {}

    # Loop over each occurrence in the response
    for record in results:
        this_genus = record.get("genus")
        this_species = record.get("species")
        this_media = record.get("media", [])

        if not this_genus or not this_species:
            continue  # Skip records without genus or species

        # If genus is not yet in final structure, add it
        if this_genus not in genus_map:
            genus_map[this_genus] = {
                "name": this_genus,
                "occurenceTotalGenus": 0,
                "subgenena": []
            }

        # Increment total occurrences for this genus
        genus_map[this_genus]["occurenceTotalGenus"] += 1

        # Check if species already exists in subgenena
        species_exists = any(s["name"] == this_species for s in genus_map[this_genus]["subgenena"])
        
        if not species_exists:
            genus_map[this_genus]["subgenena"].append({
                "name": this_species,
                "occurrences": random.randint(1, 100),  # Random occurrences count,
                "imgUrl": this_media[0]["identifier"] if len(this_media) != 0 else None
            })

    # loop over all the genuses and remove the ones with 2 or less occurenceCount
    for key in list(genus_map):
        if genus_map[key]["occurenceTotalGenus"] <= 2 or genus_map[key]["occurenceTotalGenus"]>=9:
            # append that key to keys_to_remove
            del genus_map[key]

    # Convert dictionary to list
    final_data["genuses"] = list(genus_map.values())

    for i in final_data["genuses"]:
        for j in i["subgenena"]:
            j["description"] = get_sub_species_info_from_LLM(j["name"])

    filename = "sampledata3.json"

    with open(filename, 'w') as file:
        json.dump(final_data, file, indent=4)

    return final_data
    

if __name__ == "__main__":
    func1(stateProvince=["Massachusetts"],
          county=["Suffolk"],
          locality=[],
          municipality=[])