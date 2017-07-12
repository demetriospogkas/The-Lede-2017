#1) Make a list of the following numbers: 22, 90, 0, -10, 3, 22, and 48
create_list = [22, 90, 0, -10, 3, 22, 48]

#2) Display the number of elements in the list.
number_of_elements = len(create_list)
print(number_of_elements)

#3) Display the 4th element of this list.
fourth_element_display = create_list[3]
print(fourth_element_display)

#4) Display the sum of the 2nd and 4th element of the list.
second_fourth_elements_sum = create_list[1] + create_list[3]
print(second_fourth_elements_sum)

#5) Display the 2nd-largest value in the list.
sort_the_list = sorted(create_list)
print(sort_the_list[-2])

# 6) Display the last element of the original unsorted list
print(create_list[-1])

# 7) For each number, display a number: 
#   If your original number is less than 10, multiply it by thirty.
#   If it's also even, add six.
#   If it's greater than 50 subtract ten. 
#   If it's not negative ten, subtract one. 
#   (For example: 2 is less than 10, so 2 * 30 = 60, 2 is also even, so 60 + 6 = 66, 
#   2 is not negative ten, so 66 - 1 = 65.)

math = 0
for number in create_list:
  if (number != -10) and (number > 50):
    math = number - 1 -10
  elif (number != -10) and (number < 10) and (number % 2 == 0):
    math = (number * 30) + 6
  elif (number != -10) and (number < 10):
    math = number * 30
  else: math = number
  print(math)


# 8) Display the sum of all of the numbers divided by two.
sum_nums = 0
for x in create_list:
  sum_nums = sum_nums + x
print(sum_nums / 2)


# 8) Sometimes dictionaries are used to describe multiple aspects of a single object.
# Like, say, a movie. Define a dictionary called movie that works with the following code.
# print("My favorite movie is", movie['title'], "which was released in", movie['year'], 
# "and was directed by", movie['director'])
movie = {
  'title': 'A Nice Title for Success',
  'year': 1999,
  'director': 'Name Surname',
} 

print("My favorite movie is", movie['title'], "which was released in", movie['year'], "and was directed by", movie['director'])

# 9) On the lines after that, add entries to the movie dictionary for budget and revenue (you'll use code like movie['budget'] = 1000), and print out the difference between the two.
movie = {
  'title': 'A Nice Title for Success',
  'year': 1999,
  'director': 'Name Surname',
  'budget': 30000000,
  'revenue': 15000000
}

difference_revenue_budget = movie['revenue'] - movie['budget']
if movie['revenue'] > movie['budget']:
  print("The movie generated", difference_revenue_budget, "dollars more than its budget.")
elif movie['revenue'] < movie['budget']:
  difference_revenue_budget = abs(difference_revenue_budget)
  print("The movie generated", difference_revenue_budget, "dollars less than its budget.")


# 10) If the movie cost more to make than it made in theaters, print "It was a flop". If the film's revenue was more than five times the amount it cost to make, print "That was a good investment."
movie = {
  'title': 'A Nice Title for Success',
  'year': 1999,
  'director': 'Name Surname',
  'budget': 10000000,
  'revenue': 60000000
}

if movie['revenue'] > movie['budget'] * 5:
  print("The movie was a good investment.")
elif movie['revenue'] < movie['budget']:
  print("The movie was a flop.")



# 11) Sometimes dictionaries are used to describe the same aspects of many different objects. Make ONE dictionary that describes the population of the boroughs of NYC. Manhattan has 1.6 million residents, Brooklyn has 2.6m, Bronx has 1.4m, Queens has 2.3m and Staten Island has 470,000. (Tip: keeping it all in either millions or thousands is a good idea)
#  'name': ['Manhattan', 'Brooklyn', 'Bronx', 'Queens', 'Staten Island'],
#  'population': [1.6, 2.6, 1.4, 2.3, 0.47]
population_of_boroughs = {
  'Manhattan': 1.6,
  'Brooklyn': 2.6,
  'Bronx': 1.4,
  'Queens': 2.3,
  'Staten Island': 0.47
}

# 12) Display the population of Brooklyn.
print("Brooklyn\'s population is", population_of_boroughs['Brooklyn'], "millions.")

# 13) Display the combined population of all five boroughs.
population_sums = 0
for borough in population_of_boroughs:
  population_sums = population_sums + population_of_boroughs[borough]
print("The combined population of all five boroughs is", population_sums, "millions.")


# 14) Display what percent of NYC's population lives in Manhattan.
population_sums = 0
for borough in population_of_boroughs:
  population_sums = population_sums + population_of_boroughs[borough]
manhattan_population_pc = population_of_boroughs['Manhattan'] / population_sums
print("Manhattan\'s population accounts for", round(manhattan_population_pc * 100, 2), "% of all NYC boroughs population")