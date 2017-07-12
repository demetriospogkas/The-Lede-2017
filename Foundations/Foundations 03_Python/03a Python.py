#1) Count how many numbers are in the list. Use a for loop, do NOT use len. 
numbers = [4, 5, 1, 10, 200, 34, 22, 19, 43, 56, 32, 11, 40, 82, 23, 43, 12, 65, 10]

how_many_numbers = 0
for one_number in numbers:
  how_many_numbers = how_many_numbers + 1
print("In the list there are", how_many_numbers, "numbers.")

#2) Add another number to the list. You can pick the number!
numbers.append(233)
new_numbers = numbers

which_number_added = new_numbers[-1]
new_numbers_length = len(new_numbers)

print("I added to the list, the number", which_number_added, ". Now the list has", new_numbers_length, "numbers.")

#3) Count how many even numbers are in the list. Use a for loop.
how_many_even_numbers = 0
for even_numbers in new_numbers:
  if even_numbers % 2 == 0:
    how_many_even_numbers = how_many_even_numbers + 1
  else:
    how_many_even_numbers = how_many_even_numbers
print("In the list there are", how_many_even_numbers, "even numbers.")


#4) Count how many values are above the mean and how many are below the mean. Use a for loop.
from statistics import mean
list_mean = mean(new_numbers)

mean_above = 0
mean_below = 0
for numbers_mean in new_numbers:
  if numbers_mean >= list_mean:
    mean_above = mean_above + 1
  else: mean_below = mean_below + 1
print("The list\'s mean is", list_mean, ". There are", mean_above, "numbers in the list that are above of or equal to the list\'s mean. There are also another", mean_below, "that are below the list\'s mean.")


#5) Total up the numbers. Use a for loop, do NOT use sum().
sum_of_new_numbers = 0
for a_number in new_numbers:
  sum_of_new_numbers = sum_of_new_numbers + a_number
print("The total of the numbers in our list adds up to", sum_of_new_numbers)



#6) Total up the numbers that are above the mean and the numbers below the mean. Use a for loop, do not use sum().
sum_mean_above = 0
sum_mean_below = 0
for one_of_numbers in new_numbers:
  if one_of_numbers >= list_mean:
    sum_mean_above = sum_mean_above + one_of_numbers
  else:
    sum_mean_below = sum_mean_below + one_of_numbers
print("The total of the numbers above the mean adds up to", sum_mean_above)
print("The total of the numbers below the mean adds up to", sum_mean_below)



#7) Find the largest number. Use a for loop.
#Source: https://stackoverflow.com/questions/14448692/find-the-maximum-number-in-a-list-using-a-loop
big = None
spot = None
for i, v in enumerate(new_numbers):
    if big is None or v > big:
         big = v
         spot = i
print(big)


#8) You have a list of dogs, shown below. BUT YOU GOT ANOTHER DOG!!! His name is Maxwell, please add him to the list (and no, you don't just add him to the end of that line). Use a for loop.
dogs = ["Sparky", "Jane", "Matilda", "Blartsburg"]

dogs.append("Maxwell")
new_dogs = dogs

print("Now my list has a new dog. His name is:", new_dogs[-1])


#9) Make a list of all dogs that have names of 5 characters or less. Use a for loop.
print("The dogs that have 5 or less characters in their names are:")
for dog in new_dogs:
  if len(dog) <= 5:
    print('\u2022', dog)



#10) I'm on a web page with some links about Zurich, and the URL looks like this: http://important-swiss-things.ch/docs/download/ZH
cantons = [ "ZH", "BE", "LU", "UR", "SZ", "OW", "NW", "GL", "ZG", "FR", "SO", "BS", "BL", "AR", "AI", "SG", "GR", "AG", "TG", "TI", "VD", "VS", "NE", "GE", "JU"]

print("The list of the canton URLs is:")
for one_canton in cantons:
  print('\u2022', "http://important-swiss-things.ch/docs/download/" + one_canton)


#11) I'm trying to get some top-secret documents from top-secret-secrets.com, and while I know the URL pattern I don't want to type them all out individually!
#Each secret document has a document ID and is made up of 12 pages, pages "001.pdf" through "012.pdf". Each page is available at a different URL. For example, for the document ID of QQ7LTHM, the pages are available at
#www.top-secret-pdfs.com/content/secrets/QQ7LTHM/page/001.pdf
#www.top-secret-pdfs.com/content/secrets/QQ7LTHM/page/002.pdf
#www.top-secret-pdfs.com/content/secrets/QQ7LTHM/page/003.pdf
#...
#www.top-secret-pdfs.com/content/secrets/QQ7LTHM/page/012.pdf
#I have the following document IDs:
#qq7lthm
#jemsqhg
#O6itcke
#cp4Iua0
#bkijcmo
#ctoyjrm
#z8wc6xy
#zk4Bmm0
#Can you print out all of the URLs? Note that the document IDs need to be capitalized in the URL!

document_ids = ["qq7lthm", "jemsqhg", "O6itcke", "cp4Iua", "bkijcmo", "ctoyjrm", "z8wc6xy", "zk4Bmm0"]
pages_num = range(0,13)


print("The list of secret documents you need to donwload is:")
for one_id in document_ids:
  one_id = one_id.upper()
  for page_number in pages_num:
    page_number = str(page_number)
    if int(page_number)  < 10:
      page_number = '00' + page_number
    else: page_number = '0' + page_number
    print("\u2022", "www.top-secret-pdfs.com/content/secrets/" + one_id + "/page/" + page_number + ".pdf")