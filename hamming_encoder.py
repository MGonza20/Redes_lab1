

def power_of_two(n):
    return (n & (n - 1)) == 0

def encode(n: int, frame: str) -> str:
    m = len(frame)
    r = n - m
    matrix_ = [['p' if power_of_two(col) else 'd' for col in range(1, n+1)] 
               for row in range(r+2)]
    
    iter_f = iter(frame)
    matrix_[0] = [next(iter_f, 'd') if x == 'd' else x for x in matrix_[0]]
    
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

    # Se asignan los bits de paridad
    p_cols = [i for i, x in enumerate(guide) if x == 'p']
    matrix_eval = matrix_[1:]
    for indx, col in enumerate(p_cols):
        row_ = matrix_eval[indx]
        matrix_eval[indx][col] = '1' if row_.count('1') % 2 != 0 else '0'

    # Se arma la trama
    t_matrix = list(zip(*matrix_eval)) 
    for i, col in enumerate(t_matrix):  
        if '1' in col:
            matrix_eval[-1][i] = '1'
        else:
            matrix_eval[-1][i] = '0'

    return ''.join(matrix_eval[-1])
    

frame_result = encode(11, '0101001')
print(frame_result)