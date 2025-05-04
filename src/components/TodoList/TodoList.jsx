import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ items, onDelete }) => {
  return (
    <Grid>
      {items.map((item, index) => (
        <GridItem key={item.id}>
          <TodoListItem item={item} index={index} onDelete={onDelete} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
