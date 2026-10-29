import pymupdf
p=pymupdf.open(r'C:\Users\Localuser\Downloads\Template - Payroll DV (16-25) - OCC.pdf')[0]
for image in p.get_images():
 p.delete_image(image[0])
texts=['VON FRANCIS A. LA VICTORIA','608-887-296','Payment of services rendered for the period of','October 16 - October 31, 2026','DESIDERIO R. APAG III, PCpE, D.ENG., ASEAN Eng.','Commissioner','MARIA PAZ D. GALANG-BUSTOS','ALMA SY- PATRON, Ph.D.','Chief Accountant, AFMS','Director IV, AFMS']
for text in texts:
 for rect in p.search_for(text):
  p.add_redact_annot(rect,fill=(1,1,1),cross_out=False)
p.apply_redactions(images=0,graphics=0)
p.get_pixmap(matrix=pymupdf.Matrix(3,3)).save('public/disbursement-template.png')
