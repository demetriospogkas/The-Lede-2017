# ~~~~~~PART ONE~~~~~~~~~#
countries = ['Greece', 'USA', 'China', 'Sweden', 'Brazil', 'Germany', 'Kenya']

# 2) Using a for loop, print each element of the list
for country in countries:
  print(country)

# 3) Sort the list permanently.
countries = sorted(countries)

# 4) Display the first element of the list.
print(countries[0])

# 5) Display the second-to-last element of the list.
print(countries[-2])

# 6) Delete one of the countries from the list using its name.
countries.remove('Sweden')
print(countries)

#7) Using a for loop, print each country's name in all caps.
# AttributeError: 'list' object has no attribute 'upper'
# for country_upper in countries:
#  country_upper = countries.upper()
#  print(country_upper)

for country_upper in countries:
  print(country_upper.upper())



#~~~~~~~PART TWO~~~~~~~#
# 1) Make a dictionary called 'tree' that responds to
# 'name', 'species', 'age', 'location_name', 'latitude' and 'longitude'.
# Pick a tree from: https://en.wikipedia.org/wiki/List_of_trees
tree = {
  'name': 'Trout Lake Big Tree',
  'species': 'Pinus ponderosa',
  'age': 32,
  'location_name': 'Mount Adams (Washington), US',
  'latitude': 46.0588,
  'longitude': -121.5296
}

# 2) Print the sentence
# "{name} is a {years} year old tree that is in {location_name}"
print (tree['name'], "is a", tree['age'], "year old tree that is in", tree['location_name'], ".")


# 3) The coordinates of New York City are 40.7128° N, 74.0059° W.
# Check to see if the tree is south of NYC, and print
# "The tree {name} in {location} is south of NYC" if it is.
# If it isn't, print "The tree {name} in {location} is north of NYC"
south_of_NYC = 40.7128 > tree['longitude'] 
if south_of_NYC == True:
  print ("The tree", tree['name'], "in", tree['location_name'], "is south of NYC.")
else:
  print ("The tree", tree['name'], "in", tree['location_name'], "is north of NYC.")



# 4) Ask the user how old they are.
# If they are older than the tree, display "you are {XXX} years older than {name}."
# If they are younger than the tree, display "{name} was {XXX} years old when you were born."
askAge = input("How old are you?")
askAge = int(askAge)

age_Differences = askAge - tree['age']
if askAge > tree['age']:
  print("You are", age_Differences, "years older than", tree['name'], ".")
else:
  print(tree['name'], "was", abs(age_Differences), "years old when you were born.") 





#~~~~~~~~~PART THREE~~~~~~#
# 1) Make a list of dictionaries of five places across the world -
# (1) Moscow, (2) Tehran, (3) Falkland Islands, (4) Seoul, and (5) Santiago.
# Each dictionary should include each city's name and latitude/longitude (see note above).
places_of_the_world = [{
    'name': 'Moscow',
    'lat': 37.616667,
    'lon': 55.75
      },
    {
    'name': 'Tehran',
    'lat': 35.696111,
    'lon': 51.423056
    },
    {
    'name': 'Falkland Islands',
    'lat': -51.7,
    'lon': -57.85
    },
    {
    'name': 'Seoul',
    'lat': 37.566667,
    'lon': 126.966667
    },
    {
    'name': 'Santiago',
    'lat': -33.45,
    'lon': -70.666667
    }]



# 2) Loop through the list, printing each city's name and whether it is above or below the equator
# (How do you know? Think hard about the latitude.).
# When you get to the Falkland Islands, also display the message
# "The Falkland Islands are a biogeographical part of the mild Antarctic zone,"
# which is a sentence I stole from Wikipedia.
equator = {
  'name': 'equator',
  'lat': 0,
  'lon': 0
}

for city in places_of_the_world:
  if city['name'] == 'Falkland Islands':
    falkland_message = 'Note: The Falkland Islands are a biogeographical part of the mild Antarctic zone'
  else: falkland_message = ''
  if city['lat'] > equator['lat']:
    where_it_is = 'and it\'s above the Equator.'
  else:
    where_it_is = 'and it\'s below the Equator.'
  print(city['name'], where_it_is, falkland_message)



# 3) Loop through the list, printing whether each city is north of south of your tree
# from the previous section.
for city in places_of_the_world:
  if city['lat'] > tree['latitude']:
    where_it_is = 'and it\'s North of'
  else:
    where_it_is = 'and it\'s South of' 
  print(city['name'], where_it_is, tree['name'])