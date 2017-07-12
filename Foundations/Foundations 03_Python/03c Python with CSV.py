import csv

csvfile = open({directory_path}, 'r')
reader = csv.DictReader(csvfile)
data = list(reader)
csvfile.close()

#1) What are the COLUMNS in our dataset?
dataset_columns = data[0].keys()
print("The COLUMNS in our datasets are the dictionaries keys. Therefore the columns are:", dataset_columns)

#2) How many countries do we have in our dataset?
number_of_countries = len(data)
print("There are", number_of_countries, "countries in our dataset.")


#3) How many countries in Asia? How about North America?
asia_sum = 0
n_america_sum = 0
for anything in data:
  if anything['Continent'] == 'Asia':
    asia_sum = asia_sum + 1
  if anything['Continent'] == 'N. America':
    n_america_sum = n_america_sum + 1
print("There are", asia_sum, "countries in Asia and", n_america_sum, "countries in North America.")


#4) What is the total population of the world?
population_sum = 0
for every_country in data:
  population_sum = population_sum + int(every_country['Population'])
population_sum = "{:,}".format(int(population_sum))
print("The total population of the world is", population_sum, "people.")


#5) Which has a larger population, Africa or South America?
pop_Africa = 0
pop_S_America = 0
for each_country in data:
  if each_country['Continent'] == 'Africa':
    pop_Africa = pop_Africa + int(each_country['Population'])
  if each_country['Continent'] == 'S. America':
    pop_S_America = pop_S_America + int(each_country['Population'])    

pop_Africa = "{:,}".format(int(pop_Africa))
pop_S_America = "{:,}".format(int(pop_S_America))

if pop_Africa > pop_S_America:
  larger = 'Africa (' + pop_Africa + ')'
  than = 'South America (' + pop_S_America + ')'
else:
  larger = 'South America (' + pop_S_America + ')'
  than = 'Africa (' + pop_Africa + ')'
print(larger, "has a larger population than", than)


#6) Calculate the total GDP of each country and print it out (right now it's per capita).
print("Each country\'s total GDP is:")

for a_country in data:
  country_gdp = int(a_country['GDP_per_capita']) * int(a_country['Population'])
  country_gdp = "{:,}".format(int(country_gdp))
  print("\u2022", a_country['Country'], "-", country_gdp)


#7) What is the median life expectancy of the world?
list_of_life_expectancies = []

for p in range(0, len(data)):
  list_of_life_expectancies.append(float(data[p]['life_expectancy']))

import statistics
life_median = statistics.median(list_of_life_expectancies)
life_median = round(life_median, 2)
print("The median life expectancy of the world is", life_median, "years old.")

list_of_Europe_life = []

for all_countries in data:
  if all_countries['Continent'] == 'Europe':
    list_of_Europe_life.append(float(all_countries['life_expectancy']))

life_Europe_median = statistics.median(list_of_Europe_life)
life_Europe_median = round(life_Europe_median, 2)
print("The median life expectancy of Europe is", life_Europe_median, "years old.")


#9) Print out each country that has a below-average life expectancy.
life_mean = statistics.mean(list_of_life_expectancies)
life_mean = round(life_mean, 2)

print("The average life expectancy in the world is", life_mean, ".", "Follows a list with countries below the world average:")
for some_countries in data:
  if some_countries['life_expectancy'] < str(life_mean):
    print('\u2022', some_countries['Country'], "-", some_countries['life_expectancy'])


#10) Print out each country that has a below-average GDP but an above-average life expectancy.
world_gdp = 0
for another_country in data:
  country_w_gdp = int(another_country['GDP_per_capita']) * int(another_country['Population'])
  world_gdp = world_gdp + country_w_gdp

gdp_mean = world_gdp / len(data)
gdp_mean = round(gdp_mean, 0)

print("World\'s combined GDP is:", "{:,}".format(world_gdp), ", while the average GDP is:", "{:,}".format(gdp_mean), ". Follows a list with countries below-average GDP but above-average life expectancy:")
for certain_country in data:
  country_w_gdp = int(certain_country['GDP_per_capita']) * int(certain_country['Population'])
  if (country_w_gdp < gdp_mean) and certain_country['life_expectancy'] > str(life_mean):
    print('\u2022', certain_country['Country'], "- GDP:", "{:,.0f}".format(country_w_gdp), "- Life expectancy:", certain_country['life_expectancy'])


#11) Calculate the 75th percentile of GDP.
gdp_all_list = []
gdp_all_dict = []

for gh in data:
  each_country_gdp = int(gh['GDP_per_capita']) * int(gh['Population'])
  gdp_all_list.append(each_country_gdp)
  gdp_all_dict.append({
    'Country' : gh['Country'],
    'GDP' : each_country_gdp
    })

median_gdp = statistics.median(gdp_all_list)

gdp_top_half_list = []
gdp_top_half_dict = []

for uo in gdp_all_dict:
  if uo['GDP'] > median_gdp:
    gdp_top_half_list.append(uo['GDP'])
    gdp_top_half_dict.append({
      'Country' : uo['Country'],
      'GDP' : uo['GDP']
      })

median_top_half = statistics.median(gdp_top_half_list)
median_top_half = "{:,}".format(median_top_half)

print("The 75th percentile of GDP, ie. the 50th percentile of only the top-half of all GDP values, should be", median_top_half)

#12) What percent of the world population has a life expectancy of below 50 years? Above 80 years?
life_below_fifty = 0
life_above_eighty = 0
for any_number in data:
  if any_number['life_expectancy'] < '50':
    life_below_fifty = life_below_fifty + 1
  if any_number['life_expectancy'] > '80':
    life_above_eighty = life_above_eighty + 1
print("There are", life_below_fifty, "countries with a life expectancy of below 50 years, and", life_above_eighty, "countries of above 80 years.")