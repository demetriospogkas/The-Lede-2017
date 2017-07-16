### DoD-suggested overwriting software companies

- Source: https://www.muckrock.com/foi/united-states-of-america-10/storage-of-biometric-information-gathered-in-theaters-of-war-745/#files
- Time of Reference: Jun 2001
- The PDF used was released after a request for the Department of Defense's Biometrics Identity Management Agency protocol for handling of information gathered in theaters of war after operations have ceased. The PDF is a memo of how to destruct unclassified DoD Hard Drives and on pages 8-9 it lists manufacturers of overwriting software that is used by DoD, as their products meet the minimum standards set by DoD policy.
- The PDF is a scanned image of a print out. So pdf2txt Python library didn't yield results. Then, the imagemagick library was used in order to convert the PDF file to high resolution PNG files and to bind them in one PNG file. Only pages 8 and 9 (that contain the desired information) were converted, for reducing the time needed for PDF to PNG conversion, and later PNG to TXT conversion. For extracting two pages of the original PDF GhostScript was used. After PNG conversion, tesseract library was used for converting the image to text. The final text file was input in the Notebook for regex analysis and extraction of information. Using geopy library and reverse geocoding, geometry (longtitude and latitude points) were created for each company in order to be placed on a continental US states map.