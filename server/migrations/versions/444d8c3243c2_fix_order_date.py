"""fix order_date

Revision ID: 444d8c3243c2
Revises: 4a451551dd5a
Create Date: 2024-10-14 18:34:52.777373

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '444d8c3243c2'
down_revision = '4a451551dd5a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['item_name'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')

    # ### end Alembic commands ###
