import os
from spellchecker import SpellChecker
import re
import time

def read_file(file_path):
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"File '{file_path}' not found.")
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    return content

def check_and_correct(text):
    spell = SpellChecker()
    words = re.split(r'(\W+)', text)  # Split to keep punctuation
    misspelled = spell.unknown([word.lower() for word in words if word.isalpha()])  # Find misspelled words
    
    corrected_words = []
    original_misspelled = []
    
    for word in words:
        if word.lower() in misspelled:
            corrected = spell.correction(word.lower())
            original_misspelled.append((word, corrected))
            corrected_words.append(corrected)  # Just append the corrected word
        else:
            corrected_words.append(word)  # Keep the original word
    
    corrected_text = ''.join(corrected_words) 
    
    return (corrected_text, original_misspelled)

def spell_checker():
    while True:
        file_path = input("Enter the full path of the text file (with extension) on your computer: ")
        file_path = r"{}".format(file_path)
        
        try:
            original_text = read_file(file_path)
        except FileNotFoundError as e:
            print(e)
            continue
        
        start_time = time.time()  # Start timing
        corrected_text, original_misspelled = check_and_correct(original_text)
        end_time = time.time()  # End timing
        execution_time = end_time - start_time  # Calculate execution time
        
        if original_misspelled:
            print("\nList of misspelled words and corrections (using spell checker):")
            for original, corrected in original_misspelled:
                print(f"Original: {original} -> Correction: {corrected}")

        print("\nCorrected Text:")
        print(corrected_text)
        
        print(f"\nExecution Time: {execution_time:.4f} seconds")  # Print execution time
        
        check_another = input("\nDo you want to check another file? (y/n): ")
        
        if check_another.lower() != 'y':
            print("Exiting spell checker.")
            break

# Run the spell checker
if __name__ == "__main__":
    spell_checker()
