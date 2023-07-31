

def power_of_two(n):
    return (n & (n - 1)) == 0

def encode(n: int, frame: str) -> str:
    m = len(frame)
    r = n - m
    matrix_ = [['p' if power_of_two(col) else 'd' for col in range(1, n+1)] 
               for row in range(r+2)]
    
    iter_f = iter(frame)
    matrix_[0] = [next(iter_f) if x == 'd' else x for x in matrix_[0]]
    
    guide = matrix_[0]
    for col_indx, row in enumerate(matrix_[1:len(matrix_) - 1], start=1):
        for row_indx, _ in enumerate(row):
            # Se convierten los numeros de cada columna para poder asignar los bits 
            # correspondientes
            binary_num = bin(row_indx+1)[2:]
            if abs(col_indx) <= len(binary_num):
                if binary_num[-col_indx] == '1':
                    selected_num = guide[row_indx]
                    # Se asigna el numero correspondiente de la trama si no 
                    # es una columna para asignar a un bit de paridad
                    if selected_num != 'p':
                        row[row_indx] = selected_num    
    return matrix_



a = encode(11, '0101001')
uu = 123